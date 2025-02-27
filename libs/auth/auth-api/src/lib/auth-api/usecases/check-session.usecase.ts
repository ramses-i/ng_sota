import { Observable } from 'rxjs';

export abstract class CheckSessionUseCase {
  abstract execute(): Observable<boolean>;
}
