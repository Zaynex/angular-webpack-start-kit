import { Injectable } from '@angular/core';
import * as _ from 'underscore';

export class PromiseFinally {
    parent: PromiseFinally;
    progressFunc: Function;
    constructor(private promise: Promise<any>) {}

    then(successCallBack, errCallBack?, progressCallback?) {
        this.progressFunc = progressCallback;
        let par = this.parent;
        while (par) {
            if (par.progressFunc) { // 不覆盖上游的progress处理器
                break;
            }
            _.extend(par, {progressFunc: progressCallback});
            par = par.parent;
        }
        let p = this.promise.then(successCallBack, errCallBack);
        let instance = new PromiseFinally(p);
        instance.parent = this;
        return instance;
    }

    catch(errCallBack) {
        let p = this.promise.catch(errCallBack);
        return new PromiseFinally(p);
    }

    finally(callback): PromiseFinally {
        let p = this.promise.then(
            value  => Promise.resolve(callback()).then(() => value),
            reason => Promise.resolve(callback()).then(() => Promise.reject(reason))
        );
        return new PromiseFinally(p);
    }

    static reject(reason?: any): PromiseFinally {
        let promise = new PromiseFinally(
            new Promise((resolve, reject): void => {
                reject(reason);
            })
        );
        return promise;
    }

    static resolve(value?: any): PromiseFinally {
        let promise = new PromiseFinally(
            new Promise((resolve): void => {
                resolve(value);
            })
        );
        return promise;
    }
}

@Injectable()
export class Defer {
    // promise: Promise<any>;
    promise: PromiseFinally;
    resolve: (value?) => void;
    reject: (error?: any, stackTrace?: string) => void;

    constructor() {
        // this.promise = new Promise((resolve, reject) => {
        // this.resolve = resolve;
        // this.reject = reject;
        // });
        this.promise = new PromiseFinally(
            new Promise((resolve, reject) => {
                this.resolve = resolve;
                this.reject = reject;
            })
        );
    }

    notify(data) {
        if (this.promise && this.promise.progressFunc && this.promise.progressFunc instanceof Function) {
            this.promise.progressFunc(data);
        }
    }

    static when(args?): PromiseFinally {
        if (args instanceof PromiseFinally) {
            return args;
        } else if (args instanceof Array) {
            return Defer.all(args);
        } else {
            return PromiseFinally.resolve(args);
        }
    }

    static reject(reason?: any): PromiseFinally {
        return PromiseFinally.reject(reason);
    }

    static resolve(value?: any): PromiseFinally {
        return PromiseFinally.resolve(value);
    }

    static all(args?) {
        // let p = Promise.all(args || []);
        // return new PromiseFinally(p);
        if (args instanceof Array) {
            let promises = [];
            args.forEach((arg) => {
                if (arg instanceof PromiseFinally) {
                    promises.push(arg);
                } else if (arg instanceof Promise) {
                    promises.push(new PromiseFinally(arg));
                } else {
                    promises.push(PromiseFinally.resolve(arg));
                }
            });
            let deferred = new Defer();
            let res = Array(args.length);
            let counter = args.length;
            if (counter === 0) {
                deferred.resolve();
            }
            promises.forEach((promise, index) => {
                promise.then((val) => {
                    res[index] = val;
                    --counter;
                    if (counter <= 0) {
                        deferred.resolve(res);
                    }
                }).catch((reason) => {
                    deferred.reject(reason);
                });
            });
            return deferred.promise;
        } else {
            // return new PromiseFinally(Promise.all(args));
            throw 'ERROR: The arguments must be Array type!';
        }
    }
}