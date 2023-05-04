import { defer, all } from 'q'
import { queue as _queue } from 'async'
import { map as _map } from 'underscore'

export function map(myArray, iterator, limit) {

    let queue
      , promiseArray

    limit = limit === undefined ? 1 : limit

    queue = _queue(function(task, callback) {
        iterator(task.elem)
            .then(function(result) {
                task.deferred.resolve(result)
                callback()
            })
            .fail(function(error) {
                task.deferred.reject(error)
                callback()
            })
    }, limit)

    promiseArray = _map(myArray, function(elem) {
        let deferred = defer()

        queue.push({
            deferred: deferred
          , elem: elem
        })

        return deferred.promise
    })

    return all(promiseArray)
}
