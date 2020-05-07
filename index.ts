import { Observable, of, from, concat } from 'rxjs';
import { allBooks } from './data';
import { setTimeout } from 'timers';

function subscribe(subscriber) {
    for (let book of allBooks) {
        subscriber.next(book);
    }
}

let allBooksObservable$ = new Observable(subscribe);

// allBooksObservable$.subscribe(book => console.log(book));


// emit error and complete the stream
// to run this sample change title in index.html to RxJsSamples

function subscribe1(subscriber) {

    if (document.title !== 'RxJsSamples') {
        subscriber.error('Not a valid rx js sample page');
    }

    for (let book of allBooks) {
        subscriber.next(book);
    }

    setTimeout(() => {
        subscriber.complete();
    }, 2000);

    return () => console.log('teadown execution');
}

let allBooksObservable1$ = new Observable(subscribe1);
// allBooksObservable1$.subscribe(book => console.log(book.title));


// using inline

let allBooksObservable2$ = new Observable(subscriber => {
    if (document.title !== 'RxJsSamples') {
        subscriber.error('Not a valid rx js sample page');
    }

    for (let book of allBooks) {
        subscriber.next(book);
    }

    setTimeout(() => {
        subscriber.complete();
    }, 2000);

    return () => console.log('teadown execution');
});

// allBooksObservable2$.subscribe(book => console.log(book.title));


// create observable using of

let source1$ = of('hello', 1, 'world', 20.22, true);
// source1$.subscribe(value => console.log(value));

let source2$ = from(allBooks);
//source2$.subscribe(value => console.log(value));

let concatSource$ = concat(source1$, source2$);
concatSource$.subscribe(value => console.log(value));
