import { ForbiddenException } from '@nestjs/common';
import type { Workout } from '../../workouts/workout.entity';

export function assertNotFinished(workout: Workout): void {
  if (workout.endDate) {
    throw new ForbiddenException('Cannot modify a finished workout');
  }
}
