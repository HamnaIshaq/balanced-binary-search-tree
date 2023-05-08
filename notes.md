# balanced binary search tree

## project specifications

- Build a balanced binary search tree
- Do not use duplicate values

  - be sure to always remove duplicate values or check for an existing value before inserting

07/05/2023

balanced BST algorithm

1. initialize start = 0 and end = length of array -1
2. mid = (start+end)/2
3. create a tree node with mid as root
4. recursively do step 5 and 6
5. calculate mid of left subarray and make it root of left subtree of main root
6. calculate mid of right subarray and make it root of right subtree of main root

Got the algorithm from (Create a balanced Binary Search Tree (BST) from a sorted array)[https://www.youtube.com/watch?v=VCTP81Ij-EM]. I was able to create a balanced binary search tree

Now, need to learn how to insert a data in BST

### insert a new node in BST

Resources:
(search and insertion )[https://www.geeksforgeeks.org/binary-search-tree-set-1-search-and-insertion/?ref=lbp]

- a new value is always inserted at the leaf node of BST
- Compare the value with the root of the BST.
  - If the value to be inserted is less than the root, move to the left subtree.
  - Otherwise, if the value is greater than the root, move to the right subtree.
- Continue this process, until we hit a leaf node.
- Now if the value is greater than the leaf, create a left child of the leaf and insert the value.
- Otherwise, if the value is greater than the leaf, create a right child of the leaf and insert the value in the right child.

Reading the above algorithm, we will us recursion to go through the tree nodes until we reach leaf node
so base case is when we reach the leaf node

- leaf node is identified by having no left or right child

### delete a node from BST

(Binary Search Trees (BSTs) - Insert and Remove Explained)[https://www.youtube.com/watch?v=wcIRPqTR3Kc]

- to delete a node, we will encounter 3 cases

1. to delete a leaf node

   - compare the value with the root of BST
     - if the value is less than the root, move to the left subtree
     - if the value is greater than the root, move to the right subtree
   - continue this process, until we hit the leaf node
   - delete this leaf node
   - keep track of the parent of leaf node

2. delete a node that has 1 child

   - compare the value with the root of BST
     - if the value is less than the root, move to the left subtree
     - if the value is greater than the root, move to the right subtree
   - continue this process, until we hit the node we want to delete
   - make the parent of this node point to the child of the node we want to delete
   - delete the node

3. delete a node that has 2 children

   - compare the value with the root of BST
     - if the value is less than the root, move to the left subtree
     - if the value is greater than the root, move to the right subtree
   - continue this process, until we hit the node we want to delete
   - find the node that is just bigger than the node we want to delete
     - go to the right subtree of the node we want to delete
     - get the node at the far left of this right subtree
     - remove this node from the far left of the right subtree
     - replace the node we want to delete with this far left node
   - delete the node
