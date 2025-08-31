using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base(x => x.ActivityDto)
    {
        RuleFor(x => x.ActivityDto.Date)
            .GreaterThan(DateTime.Now)
            .WithMessage("Date must be in the future");
    }
}
