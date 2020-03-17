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

  // reading the full branch from root last leaf 
  traverseDF (fn) {
    const arr = [this.root]; 

    while (arr.length) {
      // take out the first element in the array 
      const node = arr.shift();

      // push all of the node's children into the array using spread operator 
      arr.unshift(...node.children); 

      // aplly some function to the node 
      fn(node);
    }
  }





  levelWidth (root) {
    const arr = [root, 's'];

    // each value in counters arr will represent a level in the tree 
    const counters = [0]; 

    while (arr.length > 1) {
      // pull the next working element off the array 
      const node = arr.shift()

      if (node === 's') {
        // this means we are on a new tree level, so we add another item/level to counters arr
        counters.push(0)
        arr.push('s');
      } else {
        arr.push(...node.children); 
        // last element in counters represents the current level of the tree we are processing
        counters[counters.length -1] ++ 
      }
    }

    return counters
  }
 











}
