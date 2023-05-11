// FACTORY TO CREATE A TREE NODE
const Node = (data, leftChild = null, rightChild = null) => {
  let left = leftChild;
  let right = rightChild;
  return { data, left, right };
};
//
// FACTORY TO CREATE TREE
const Tree = (array) => {
  let root = buildTree(array);

  const insert = (root, value) => {
    // duplicate
    if (value === root.data) {
      console.log("duplicate value cannot be added");
      return;
    } else if (root.left === null && root.right === null) {
      // leaf node
      value < root.data
        ? (root.left = Node(value))
        : (root.right = Node(value));
      return;
    }
    value < root.data ? insert(root.left, value) : insert(root.right, value);
  };

  const deleteNode = (root, immediateParent, value) => {
    // delete leaf node
    if (value === root.data && root.left === null && root.right === null) {
      immediateParent.left === root
        ? (immediateParent.left = null)
        : (immediateParent.right = null);
      root = undefined;
      return;
    }
    // delete a node with 2 children
    else if (value === root.data && root.left !== null && root.right !== null) {
      console.log(root.right);
      let newRootForDeletedNode = root.right;
      let newRootDirentParent = root;
      while (newRootForDeletedNode.left !== null) {
        newRootDirentParent = newRootForDeletedNode;
        newRootForDeletedNode = newRootForDeletedNode.left;
      }
      console.log(newRootDirentParent);
      newRootDirentParent.left = newRootForDeletedNode.right;

      root.data = newRootForDeletedNode.data;
      return;
    }
    // delete a node with 1 child
    else if (
      value === root.data &&
      (root.left !== null || root.right !== null)
    ) {
      const child = root.left ? root.left : root.right;

      immediateParent.left !== null && immediateParent.left.data === root.data
        ? (immediateParent.left = child)
        : (immediateParent.right = child);
      root = undefined;
      return;
    }
    value < root.data
      ? deleteNode(root.left, root, value)
      : deleteNode(root.right, root, value);
  };

  const find = (root, value) => {
    if (root.data === value) {
      console.log(root);
      return root;
    }
    return value < root.data ? find(root.left, value) : find(root.right, value);
  };

  const levelOrder = (root, queueArr = [root], finalTraversedResult = []) => {
    if (queueArr.length === 0) {
      return finalTraversedResult;
    } else if (queueArr.length !== 0) {
      finalTraversedResult.push(root.data);
      queueArr.shift();
      if (root.left !== null) {
        queueArr.push(root.left);
      }
      if (root.right !== null) {
        queueArr.push(root.right);
      }
      return levelOrder(queueArr[0], queueArr, finalTraversedResult);
    }
  };

  const inOrder = (root, finalTraversedResult = []) => {
    if (root === null) {
      return;
    }
    inOrder(root.left, finalTraversedResult);
    finalTraversedResult.push(root.data);
    inOrder(root.right, finalTraversedResult);
    return finalTraversedResult;
  };

  const preOrder = (root, finalTraversedResult = []) => {
    if (root === null) {
      return;
    }
    finalTraversedResult.push(root.data);
    preOrder(root.left, finalTraversedResult);
    preOrder(root.right, finalTraversedResult);
    return finalTraversedResult;
  };

  const postOrder = (root, finalTraversedResult = []) => {
    if (root === null) {
      return;
    }
    postOrder(root.left, finalTraversedResult);
    postOrder(root.right, finalTraversedResult);
    finalTraversedResult.push(root.data);
    return finalTraversedResult;
  };

  return {
    root,
    insert,
    deleteNode,
    find,
    levelOrder,
    inOrder,
    preOrder,
    postOrder,
  };
};

// BUILD TREE FROM SORTED ARRAY
const buildTree = (array, start = 0, end = array.length - 1) => {
  if (start > end) {
    return null;
  }
  let mid = Math.floor((start + end) / 2);
  let root = Node(array[mid]);

  root.left = buildTree(array, start, mid - 1);
  root.right = buildTree(array, mid + 1, end);

  return root;
};

// PRINT TREE ON CONSOLE
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const array = [1, 7, 4, 23, 8, 9, 3, 5, 67, 6345, 324, 321];
//const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

array.sort(function (a, b) {
  return a - b;
});

const tree = Tree(array);
prettyPrint(tree.root);
console.log("insert value 10 in tree");
tree.insert(tree.root, 10);
prettyPrint(tree.root);

console.log("find value 10 in tree");
const foundNode = tree.find(tree.root, 9);
prettyPrint(foundNode);

const levelOrderTraversal = tree.levelOrder(tree.root);
console.log(levelOrderTraversal);

const inOrderTraversal = tree.inOrder(tree.root);
console.log(inOrderTraversal);

const preOrderTraversal = tree.preOrder(tree.root);
console.log(preOrderTraversal);

const postOrderTraversal = tree.postOrder(tree.root);
console.log(postOrderTraversal);
/*
console.log("delete 8");
tree.deleteNode(tree.root, tree.root, 8);
prettyPrint(tree.root);*/
