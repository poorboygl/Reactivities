import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";
import { useLocation } from "react-router";
import { useAccount } from "./useAccount";


export const useActivities = (id? : string) => {
  const queryClient = useQueryClient();
  const {currentUser} = useAccount();
  const location = useLocation();
  
  const { data: activitiesGroup, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useInfiniteQuery<PagedList<Activity,string>>({
    queryKey: ['activities'],
    queryFn: async ({pageParam = null}) => {      
      const response = await agent.get<PagedList<Activity,string>>('/activities', {
        params: {
          cursor: pageParam,
          pageSize: 3
        }
      });
      return response.data;
    },
    staleTime: 1000*60*5,
    initialPageParam: null,
    getNextPageParam: (LastPage) => LastPage.nextCursor,
    enabled: !id && location.pathname === '/activities' && !!currentUser,
    select: data => ({
      ...data,
      pages : data.pages.map((page) => ({
          ...page,
          items: page.items.map(activity => {
            const host = activity.attendees.find(x => x.id === activity.hostId);
            return {
              ...activity,
              isHost: currentUser?.id === activity.hostId,
              isGoing: activity.attendees.some(a => a.id === currentUser?.id),
              hostImageUrl: host?.imageUrl
            }
          })
      }))
    })
  });

  const {data: activity, isLoading: isLoadingActivity} = useQuery({
      queryKey: ['activities', id],
      queryFn: async () => {
        const response = await agent.get<Activity>(`/activities/${id}`);
        return response.data;
      },
      // !!id means the query will only run if id is truthy
      enabled: !!id && !! currentUser,
      select: data => {
        const host = data.attendees.find(x => x.id === data.hostId);
        return {
          ...data,
          isHost: currentUser?.id === data.hostId,
          isGoing: data.attendees.some(a => a.id === currentUser?.id),
          hostImageUrl: host?.imageUrl
        }
      }
  })

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
     await agent.put(`/activities/`, activity);
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      });
    }
  });

    const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
     const response = await agent.post(`/activities/`, activity);
     return response.data;
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      });
    }
  });

    const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
     await agent.delete(`/activities/${id}`);
    },
    onSuccess: async() => {
      await queryClient.invalidateQueries({
        queryKey: ['activities']
      });
    }
  });

  const updateAttendance = useMutation({
    mutationFn: async (id: string) => {
     await agent.post(`/activities/${id}/attend`);  
    },
    onMutate: async (activityId: string) => {
      await queryClient.cancelQueries({ queryKey: ['activities', activityId] });
      const previousActivity = queryClient.getQueryData<Activity>(['activities', activityId]);

        queryClient.setQueryData<Activity>(['activities', activityId], oldActivity => {
          if(!oldActivity || !currentUser) return oldActivity;

          const isHost = oldActivity.hostId === currentUser.id;
          const isAttending = oldActivity.attendees.some(a => a.id === currentUser.id);

          return {
            ...oldActivity,
            isCancelled: isHost ? !oldActivity.isCancelled : oldActivity.isCancelled,
            isGoing: isAttending ? false : true,
            attendees: isAttending
              ? isHost 
                ? oldActivity.attendees
                : oldActivity.attendees.filter(a => a.id !== currentUser.id)
              : [...oldActivity.attendees, {
                id: currentUser.id,
                displayName: currentUser.displayName,
                image: currentUser.imageUrl,
                
              }]
          }

        });

        return { previousActivity  };
      },
      onError: (error, activityId, context) => {
        console.log(' previousActivity: ' +context?.previousActivity);
        console.log(error);
        if(context?.previousActivity) {
          queryClient.setQueryData(['activities', activityId], context.previousActivity);
        }
      },
    }
  );

  return { 
    activitiesGroup,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage, 
    isLoading,
    updateActivity,
    createActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
    updateAttendance
  };
};
