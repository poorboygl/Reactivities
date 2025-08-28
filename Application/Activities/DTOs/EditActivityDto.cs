using System;

namespace Application.Activities.DTOs;

public class EditActivityDto : BaseActivityDto
{
    public required string Id { get; set; } = "";
}
