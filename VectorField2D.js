class VectorField
{
  
  constructor(FieldWidth, FieldHeight, Rows, Cols, Offset)
  {
    this.FieldWidth = FieldWidth;
    this.FieldHeight = FieldHeight;
    this.Rows = Rows;
    this.Cols = Cols;
    this.VectorArray = [];
    this.Offset = Offset;
    this.LoadArray();
    
  }
  
  LoadArray()
  {
    for(let i = 0; i < this.Cols; i++)
    {
      this.VectorArray[i] = [];
      for(let j = 0; j < this.Rows; j++)
      {
        let yPos = map(i, 0, this.Cols, 0, this.FieldHeight);
        let xPos = map(j, 0, this.Rows, 0, this.FieldWidth);
        this.VectorArray[i][j] = new FieldVector(this.Offset.copy().add(createVector(xPos, yPos)));
      }
    }
  }
  
  Show()
  {
    for(let i = 0; i < this.Cols; i++)
    {
      for(let j = 0; j < this.Rows; j++)
      {
        this.VectorArray[i][j].Show();
      }
    }
  }
  
  UpdateVectors(Mag, scale = 4000) {
    for (let i = 0; i < this.Cols; i++) {
      for (let j = 0; j < this.Rows; j++) {
        const magneticField = Mag.CalculateMagneticField(this.VectorArray[i][j].Pos);

        
      

        this.VectorArray[i][j].StrengthVec = magneticField.normalize().mult(5);
      }
    }
  }
  
  
}