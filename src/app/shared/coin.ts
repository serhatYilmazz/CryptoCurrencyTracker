export class Coin {
  constructor(
    public id,
    private name,
    private currentValue,
    public change1h: Number,
    public change24h: Number,
    private imagePath,
    public rank
  ) {}
}
