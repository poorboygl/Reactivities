using System;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Map from and Map to
        CreateMap<Activity, Activity>();
    }
}
