import { Observable } from 'rxjs';

let myNumbers = [1,2,3]

let numberObservable$ = new Observable(subscriber => {
    if (myNumbers.length == 0) { subscriber.error('No values'); }
    
    for(let number of myNumbers) {
        subscriber.next(number);
    }

    subscriber.complete();
});


let myObserver = {
    next: value => console.log('Value: ', value),
    error: err => console.log('ERROR: ', err),
    complete: () => console.log('All done!')
}

numberObservable$.subscribe(myObserver);