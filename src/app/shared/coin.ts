export class Coin {
  constructor(
    private id,
    private name,
    private currentValue,
    public change1h: Number,
    public change24h: Number,
    private imagePath,
    public rank
  ) {}
}
