import CircleInterface from '../CircleInterface';

const isCirclesIntersect = (circle1: CircleInterface, circle2: CircleInterface) => {
  return Math.pow((circle1.x - circle2.x), 2) + Math.pow((circle1.y - circle2.y), 2)
    < Math.pow(circle1.r + circle2.r, 2)
    ;
};

export default isCirclesIntersect;
