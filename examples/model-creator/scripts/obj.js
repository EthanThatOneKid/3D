function getObj(vertices) {
  let str = "# EthanThatOneKid\'s Object\r\n";
  for (let i = 0; i < vertices.length; i++) {
    let v = vertices[i];
    str += `v ${v.x} ${v.y} ${v.z}\r\n`;
  }
  return str;
}
