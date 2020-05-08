import { Observable, of, from, concat, fromEvent } from 'rxjs';
import { allBooks, allReaders } from './data';
import { setTimeout } from 'timers';

//#region Creating Observables

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
//concatSource$.subscribe(value => console.log(value));

let button = document.getElementById('readersButton');
fromEvent(button, 'click')
    .subscribe(event => {
        console.log(event);

        let readersDiv = document.getElementById('readers');
        for(let reader of allReaders) {
            readersDiv.innerHTML += reader.name + '<br />';
        } 
    });
//#endregion

//#region Subscribing to Observables with Observer
    let allBooks$ = from(allBooks);

    let booksObserver = {
        next: book => console.log(`Title: ${book.title}`),
        error: err => console.log(`ERROR: ${err}`),
        complete: () => console.log('All Done!')
    }

    allBooks$.subscribe(booksObserver);
//#endregion