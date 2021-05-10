class Node {
	constructor(val, priority) {
		this.val = val;
		this.priority = priority;
	}
}
class PriorityQueue {
	constructor() {
		this.values = [];
	}
	// Insert a value into the heap
	enqueue(val, prio) {
		const newNode = new Node(val, prio);
		this.values.push(newNode);
		let index = this.values.length - 1;
		const element = this.values[index];
		while (index > 0) {
			let parentIndex = Math.floor((index - 1) / 2);
			let parent = this.values[parentIndex];
			if (element.priority >= parent.priority) break;
			this.values[parentIndex] = element;
			this.values[index] = parent;
			index = parentIndex;
		}
	}
	// Remove the highest value (the root) from the heap
	dequeue() {
		const max = this.values[0];
		const end = this.values.pop();
		if (this.values.length > 0) {
			this.values[0] = end;
		}
		const length = this.values.length;
		let parentIdx = 0;
		let parent = this.values[0];
		while (true) {
			let leftChild, rightChild;
			let swap = null;
			let leftChildIdx = 2 * parentIdx + 1;
			let rightChildIdx = 2 * parentIdx + 2;
			if (leftChildIdx < length) {
				leftChild = this.values[leftChildIdx];
				if (leftChild.priority < parent.priority) {
					swap = leftChildIdx;
				}
			}
			if (rightChildIdx < length) {
				rightChild = this.values[rightChildIdx];
				if (
					(swap === null && rightChild.priority < parent.priority) ||
					(swap !== null && rightChild.priority < leftChild.priority)
				) {
					swap = rightChildIdx;
				}
			}
			if (swap === null) break;
			[ this.values[parentIdx], this.values[swap] ] = [
				this.values[swap],
				this.values[parentIdx]
			];
			parentIdx = swap;
		}
		return max;
	}
}

const testPrioQueue = new PriorityQueue();
testPrioQueue.enqueue('Dog', 2);
testPrioQueue.enqueue('Wolf', 5);
testPrioQueue.enqueue('Chicken', 4);
testPrioQueue.enqueue('Cat', 3);
testPrioQueue.enqueue('Human', 1);
console.log(testPrioQueue.values);
console.log(testPrioQueue.dequeue());
console.log(testPrioQueue.dequeue());
console.log(testPrioQueue.dequeue());
console.log(testPrioQueue.dequeue());
console.log(testPrioQueue.dequeue());
console.log(testPrioQueue.dequeue());
