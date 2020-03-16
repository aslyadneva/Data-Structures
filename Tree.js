class Node {
  constructor (data) {
    this.data = data, 
    this.children = []
  }

  add (data) {
    this.children.push(new Node(data));
  }

  remove (data) {
    this.children = this.children.filter(child => child.data !== data);
  }
}

class Tree {
  constructor () {
    this.root = null 
  }

  // reading each level from left to right 
  traverseBF (fn) {
    const arr = [this.root]; 

    while (arr.length) {
      // take out the first element in the array 
      const node = arr.shift();

      // push all of the node's children into the array using spread operator 
      arr.push(...node.children); 

      // aplly some function to the node 
      fn(node);
    }
  }


}
