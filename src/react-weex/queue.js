function Wrapper(content) {
  return {
    content,
    next: null
  };
}

function Queue() {
  this.first = null;
  this.last = null;
}

Queue.prototype.push = function(node) {
  if (this.first === null) {
    this.first = this.last = Wrapper(node);
  } else {
    this.last.next = Wrapper(node);
    this.last = this.last.next;
  }
};

Queue.prototype.forEach = function(f) {
  let current = this.first;
  let i = 0;

  while (current !== null) {
    f(current, i);
    i++;
    current = current.next;
  }
};

export default Queue;
