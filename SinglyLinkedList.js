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

  // return the length of the list if we didn't have this.length property updated with each method
  size () {
    if (!this.head) {
      return 0 
    }

    let current = this.head;
    let count = 0; 

    while(current) {
      count++
      current = current.next
    }

    return count
  }

  // add an item at the end 
  push(val) {
    let newNode = new Node(val); 

    if (!this.head) {
      this.head = newNode; 
      this.tail = newNode; 
    } else {
      // when there is one existing node or more 
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
        /*** AS LONG AS CURRENT HAS A NEXT PROPERTY, NEW TAIL WILL ALWAYS BE THE CURRENT AKA ALWAYS ONE STEP BEHIND */
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

  getAt (index) {
    let idx = 0; 
    let current = this.head; 
    while (current) {
      if (idx === index) {
        return current
      }
      current = current.next; 
      idx++
    }

    return null 
  }

  removeAt (index) {
    if (!this.head) {
      return null 
    }
    if (index === 0) {
      this.head = this.head.next;
      return 
    }

    let prevNode = getAt(index-1); 
    if (!prevNode || !prevNode.next) {
      return 
    }
  
    let nodeToRemove = prevNode.next;
    let succeedingNode = nodeToRemove.next;

    prevNode.next = succeedingNode

  }

  insertAt (value, index) {
    let nodeToInsert = new Node(value); 
    
    // if the list is empty, add a new head
    if (!this.head) {
      this.head = nodeToInsert; 
      return;
    }

    // if trying to insert at the beginning of the list 
    if (index === 0){
      nodeToInsert.next = this.head; 
      this.head = nodeToInsert; 
      return;
    }

    
    let prevNode = getAt(index -1) || this.getLast(); 
    let nodeToBeShifted = prevNode.next;  

    // if previous node is the last in the list, insert the new node at the end of the list
    // set the new node as the next property of the prevNode  
    if (!nodeToBeShifted) {
      prevNode.next = nodeToInsert
      return 
    }

    nodeToInsert.next = nodeToBeShifted; 
    prevNode.next = nodeToInsert; 
  }

  getFirst () {
    if(!this.head) {
      return null 
    }
    return this.head
  }

  // return the last node in the list (aka the TAIL) if we didn't have a this.tail property 
  getLast () {
    if (!this.head) {
      return null 
    }

    let current = this.head; 

    // if a current node doesn't have a next property it means its the last node in the list 
    while (current.next) {
      current = current.next
    }

    return current 
  }

  // clear the entire list 
  clear () {
    this.head = null; 
  }

  // remove the first node from the list 
  removerFirst () {
    // if the list is empty, return null
    if (!this.head) {
      return null 
    }

    // if the head doesn't have a next property (aka if it's the only item in the list)
    // remove the head by setting it to null 
    if (!this.head.next) {
      this.head = null
    }

    //if the head DOES have a next property 
    // set the head's next property to be this.head
    if (this.head.next) {
      this.head = this.head.next 
    }

    return this; 
  }

  removeLast () {
    // if there is nothing in the list, return null
    if (!this.head) {
      return null 
    }

    // if there is only one item in the list, remove the head 
    if(!this.head.next) {
      this.head = null
    }

    // if there are more than 1 nodes in the list 
    let newTail = this.head; // preceeding element
    let current = this.head; // current element 

    while (current.next) {
      newTail = current; 
      current = current.next; 
    }

    // cut off the current element from the elemenet preceeding it (aka the newTail)
    newTail.next = null 
  }

  insertLast (value) {

    let nodeToInsert = new Node(value); 

    if (!this.head) {
      this.head = nodeToInsert; 
    }

    let current = this.head; 
    while (current) {
      current = current.next
    }
    current.next = nodeToInsert;
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

  forEach (fn) {
    let node = this.head; 
    let counter = 0;

    while (node) {
      // while there is a node present in the list, call the passed in function with that node
      // so bacically for each node in the list, we are executing some functioon
      fn(node, counter)
      node = node.next; 
      counter ++
    }
  }

  *[Symbol.iterator] () {
    let node = this.head; 
    while (node) {
      yield node 
      node = node.next;
    }
  }

}

