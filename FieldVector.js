class FieldVector
{
  constructor(pos)
  {
    this.Pos = pos;
    this.StrengthVec = createVector(0,0);
  }
  
  Show() 
  {
    point(this.Pos.x, this.Pos.y);

    let endPoint = this.Pos.copy().add(this.StrengthVec);

    line(this.Pos.x, this.Pos.y, endPoint.x, endPoint.y);
  }
}