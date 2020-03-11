class Node {
  constructor (val) {
    this.val = val; 
    this.next = null
  }
}

class SinglyLinkedList {
  constructor () {
    this.head = null; 
    this.tail = null; 
    this.length = 0 
  }

  // add an item at the end 
  push(val) {
    let newNode = new Node(val); 

    if (!this.head) {
      this.head = newNode; 
      this.tail = newNode; 
    } else {
      // this.tail.next is pointing to the same place in memory as this.head (when there is only one node)
      // therefore, when a second node is added, this.tail.next is actually setting this.head.next's property 
      // any subsequent node additions will set the previous tail's next value NOT the head beacuse now head and tail are not the same value 
      this.tail.next = newNode;
      this.tail = newNode; 
    }

    this.length ++;
    return this; 
  }

  // remove an item from the end
  pop () {
    if (!this.head) {
      return undefined
    } else {

      // to pop the last item off of a linked list, we need to first traverse up to it from the head 
      // do this with a loop 
      // have two pointers; one for the current item, and one for the previous item 
      // both pointers start at the head because its always the first item in a linked list 
      let current = this.head; 
      let newTail = this.head; // this is to track the previous item 

      while (current.next) {
        // if the current item has a next property, it means there are more items after it 
        newTail = current; 

        // ******** set current to its next value to continue moving the loop forward  ******
        current = current.next 
      }

      //when the loop is done, we set the previous item as this.tail because it will be the new tail
      this.tail = newTail;
      // we cut the link to the last item we're popping by setting the tail's next property to null 
      this.tail.next = null;
      // then we decrase the list length by one 
      this.length --;

      if (this.length === 0) {
        this.head = null; 
        this.tail = null; 
      }
      
      // return the item node that was popped off 
      return current
    }
  }

  // removing an item from the beginning (aka removing the head) and making the next item the head 
  // O(1) time compared to arrays because no need to re-index everything else in the list 
  shift () {
    if (!this.head) {
      return undefined
    } else {
      let currentHead = this.head; 
      this.head = currentHead.next; 
      this.length --; 

      if (this.length === 0) {
        this.tail = null; 
      }

      return currentHead; 
    }
  }

  // adding a node to the beginning of the list 
  // aka setting the new node as the new head and moving the current head down one position
  unshift (val) {
    let newHead = new Node(val); 

    if (!this.head) {
      this.head = newHead; 
      this.tail = newHead;
    } else {
      newHead.next = this.head; 
      this.head = newHead;       
    }

    this.length ++; 
    return this; 
  }

  // returns the value of the element at the passed in index 
  // need to traverse starting at the head up to the index and return the value 
  get (index) {

    if (index < 0 || index >= this.length) {
      return null
    } else {
      let counter = 0; 
      let current = this.head;

      while(counter !== index) {       
        current = current.next
        counter++           
      }

      return current; 
    }    
  }

  set (index, value) {
    let nodeToSet = this.get(index); 
    if (nodeToSet) {
      nodeToSet.val = value; 
      return true 
    } 

    return false 
  }

  insert (index, value) {
    if(index < 0 || index > this.length) {
      return false 
    } else if (index === this.length) {
      this.push(value); 
      return true 
    } else if (index === 0) {
      this.unshift(value); 
      return true
    }
    // if none of the above are true, it means the given index is in the middle of the list 
    else {
      // define preceeding and current nodes
      // aka the inserted element will go between these two nodes 
      let preceedingNode = this.get(index-1);
      let currentNode = preceedingNode.next; 

      // create the node to insert 
      let nodeToInsert = new Node(value); 

      // set the next property of the node we want insert to the current node 
      nodeToInsert.next = currentNode; 

      //set the next property of the preceeding node to the node we want to insert 
      preceedingNode.next = nodeToInset; 

      this.length ++; 

      return true; 
    }
  }

  // the remove method accepts an index and removes the value at that index 
  remove (index) {
    if (index < 0 || index > this.length) {
      return undefined
    } 
    if (index === this.length - 1) {
      return this.pop()
    }
    if (index === 0) {
      return this.shift()
    }

    let preceedingNode = this.get(index-1);
    let nodeToRemove = preceedingNode.next; 
    let suceedingNode = nodeToRemove.next; 

    preceedingNode.next = suceedingNode; 

    this.length --; 
    return nodeToRemove; 
  }

}

