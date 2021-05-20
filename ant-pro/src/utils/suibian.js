function MyPromise (executor) {
    var self = this;
    self.status = 'pending';
    self.resolveValue = null;
    self.rejectReason = null;
    self.ResolveCallBackList = [];
    self.RejectCallBackList = [];
    function resolve(value) {
        if(self.status === 'pending') {
            self.status = 'Fulfilled';
            self.resolveValue = value;
            self.ResolveCallBackList.forEach(e => {
                e();
            })
        }
    }
    function reject(reason) {
        if(self.status === 'pending') {
            self.status = 'Rejected';
            self.rejectReason = reason;
            self.RejectCallBackList.forEach(e => {
                e();
            })
        }
    }
    try {
        executor(resolve,reject);
    }catch(e) {
        reject(e);
    }
}

MyPromise.prototype.then = function(onFulfilled,onRejected) {
    var self = this;
    if(self.status === 'Fulfilled') {
        onFulfilled(self.resolveValue);
    }
    if(self.status === 'Rejected') {
        onRejected(self.rejectReason);
    }
    if(self.status === 'pending') {
        self.ResolveCallBackList.push(function () {
            onFulfilled(self.resolveValue)
        })
        self.RejectCallBackList.push(function () {
            onRejected(self.rejectReason)
        })
    }
}