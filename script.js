// FACTORY TO CREATE A TREE NODE
const Node = (data, leftChild = null, rightChild = null) => {
  let left = leftChild;
  let right = rightChild;
  return { data, left, right };
};

// FACTORY TO CREATE TREE
const Tree = (array) => {
  let root = buildTree(array);
  return root;
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

const array = [1, 7, 4, 23, 8, 9, 3, 5, 67, 6345, 324];
//const array = [1, 2, 3, 4, 5, 6, 7, 8, 9];

array.sort(function (a, b) {
  return a - b;
});

console.log(Tree(array));
prettyPrint(buildTree(array));
