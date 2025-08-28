using System;
using Application.Core;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required Activity Activity { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var existingActivity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken);

            if (existingActivity == null) return Result<Unit>.Failure("Activity not found", 404);

            mapper.Map(request.Activity, existingActivity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            return !result ? Result<Unit>.Failure("Failed to update activity", 404) : Result<Unit>.Success(Unit.Value);
        }
    }
}