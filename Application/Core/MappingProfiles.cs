using System;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        string? currentUserId = null;
        // Map from and Map to
        CreateMap<Activity, Activity>();
        CreateMap<CreateActivityDto, Activity>();
        CreateMap<EditActivityDto, Activity>();

        // dest is ActivityDto
        CreateMap<Activity, ActivityDto>()
            .ForMember(dest => dest.HostDisplayName,
            opt => opt.MapFrom(src =>
                src.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
            .ForMember(dest => dest.HostId,
            opt => opt.MapFrom(src =>
                src.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));

        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.User.DisplayName))
            .ForMember(dest => dest.Bio, opt => opt.MapFrom(src => src.User.Bio))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.User.ImageUrl))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.User.Id))
            .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(src => src.User.Followers.Count))
            .ForMember(dest => dest.FollowingCount, opt => opt.MapFrom(src => src.User.Followings.Count))
            .ForMember(dest => dest.Following, opt => opt.MapFrom(src =>
                                src.User.Followers.Any(x => x.ObserverId == currentUserId)));

        CreateMap<User, UserProfile>()
                .ForMember(dest => dest.FollowersCount, opt => opt.MapFrom(src => src.Followers.Count))
                .ForMember(dest => dest.FollowingCount, opt => opt.MapFrom(src => src.Followings.Count))
                .ForMember(dest => dest.Following, opt => opt.MapFrom(src =>
                                src.Followers.Any(x => x.ObserverId == currentUserId)));

        CreateMap<Activity, UserActivityDto>();

        CreateMap<Comment, CommentDto>()
            .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.User.DisplayName))
            .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.User.Id))
            .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => src.User.ImageUrl));
    }
}
