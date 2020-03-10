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

}

