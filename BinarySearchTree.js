class Node {
  constructor (value) {
    this.value = value; 
    this.left = null;
    this.right = null; 
  }
}

class BinarySearchTree {
  constructor () {
    this.root = null; 
  }

  insert (value) {
    let newNode = new Node(value)

    if (!this.root) {
      this.root = newNode; 
      return this; 
    } else {
      let current = this.root; 

      while (true) {
        if (value === current.value) {
          return undefined; 
        }
        if (value < current.value) {
          if (!current.left) {
            current.left = newNode;
            return this; 
          } else {
            current = current.left;
          }
        } 
        
        else if (value > current.value) {
          if (!current.right) {
            current.right = newNode;
            return this; 
          } else {
            current = current.right; 
          }
        }
      }

    }
  }

  contains (value) {
    if (!this.root) {
      return false
    } 

    let current = this.root; 
    let isFound = false; 

    while (current && isFound === false) {
      if (value < current.value) {
        current = current.left
      }
      else if (value > current.value) {
        current = current.right
      }
      else if (value === current.value) {
        isFound = true
      }
    }

    return isFound
  }

  BFS () {
    // this is what is returned at the end with all the traversed values 
    let data = [];

    // this helps keep track of the values to be traversed 
    let queue = [];

    let node = this.root; 

    queue.push(node); 

    while(queue.length) {
      // remove FIRST element from the queue and return is as node variable 
      node = queue.shift(); 
      data.push(node.value); 

      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }

    return data
  }

  // recursive
  validate (node, min = null, max = null) {

    if (!node) {
      return false 
    }

    if (min && node.data < min) {
      return false 
    }

    if (mac && node.data > max) {
      return false 
    }

    return (
      this.validate(node.left, min, node.data) && this.validate(node.right, node.data, max)
    );
  }


}