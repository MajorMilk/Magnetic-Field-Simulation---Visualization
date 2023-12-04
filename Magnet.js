class Magnet
{
  constructor(Pos, Len, Strength)
  {
    this.Pos = Pos;
    this.Length = Len;
    this.Angle = 0;
    this.Strength = Strength;
  }
  
  GetNorthLocation()
  {
    let vec = p5.Vector.fromAngle(this.Angle, this.Length/3);
    return this.Pos.copy().add(vec);
  }
  GetSouthLocation()
  {
    let vec = p5.Vector.fromAngle(this.Angle + PI, this.Length/3);
    return this.Pos.copy().add(vec);
  }
  
  Show()
  {
    let up = this.Pos.copy().add(p5.Vector.fromAngle(this.Angle, this.Length/2));
    let down = this.Pos.copy().add(p5.Vector.fromAngle(this.Angle + PI, this.Length/2));
    
    let north = this.GetNorthLocation();
    let south = this.GetSouthLocation();
    
    let northEnd = p5.Vector.fromAngle(this.Angle, this.Length/4);
    let southEnd = p5.Vector.fromAngle(this.Angle + PI, this.Length/4);
    
    northEnd = this.Pos.copy().add(northEnd);
    southEnd = this.Pos.copy().add(southEnd);
    
    
    line(down.x, down.y, up.x, up.y);
    strokeWeight(7);
    point(north.x, north.y);
    point(south.x, south.y);
    strokeWeight(1);
  }
  
  CalculateMagneticField(point) 
  {
    // Constants
    const permeabilityFreeSpace = 4 * PI * 1e-7; // Permeability of free space

    // Distance vectors from magnet to the point
    const rNorth = p5.Vector.sub(point, this.GetNorthLocation());
    const rSouth = p5.Vector.sub(point, this.GetSouthLocation());

    // Magnetic moment of the dipole
    const magneticMoment = this.Strength * this.Length;

    // Calculate magnetic field components for both poles
    const BNorth = p5.Vector.mult(rNorth.copy().rotate(HALF_PI), (magneticMoment / pow(rNorth.mag(), 3)));
    const BSouth = p5.Vector.mult(rSouth.copy().rotate(HALF_PI), (magneticMoment / pow(rSouth.mag(), 3)));

    // Combine magnetic field components
    const magneticField = p5.Vector.sub(BNorth, BSouth).mult(permeabilityFreeSpace / (4 * PI));

    return magneticField;
  }
}