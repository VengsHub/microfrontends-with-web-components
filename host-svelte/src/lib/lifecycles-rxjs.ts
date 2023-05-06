import { onMount, onDestroy, beforeUpdate, afterUpdate } from 'svelte';
import { Subject, defer, Observable, switchMap, fromEvent } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';

// use like this: onMount$.pipe(switchMap(() => fromEvent(myDiv, 'click')));

export const onMount$ = defer(() => {
  const subject = new Subject<void>();
  onMount(() => subject.next());
  return subject.asObservable().pipe(take(1));
});

export const onDestroy$ = defer(() => {
  const subject = new Subject<void>();
  onDestroy(() => subject.next());
  return subject.asObservable().pipe(take(1));
});

export const beforeUpdate$ = defer(() => {
  const subject = new Subject<void>();
  beforeUpdate(() => subject.next());
  return subject.asObservable().pipe(takeUntil(onDestroy$));
});

export const afterUpdate$ = defer(() => {
  const subject = new Subject<void>();
  afterUpdate(() => subject.next());
  return subject.asObservable().pipe(takeUntil(onDestroy$));
});

// this does not work for onMount$ sadly
// export function waitFor<T>(signal: Observable<any>) {
//   return (source: Observable<T>) => signal.pipe(
//       take(1),
//       switchMap(() => source)
//   );
// }
