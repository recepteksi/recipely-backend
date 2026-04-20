export abstract class ValueObject<Props extends object> {
  protected readonly props: Props;

  protected constructor(props: Props) {
    this.props = props;
  }

  equals(other: ValueObject<Props>): boolean {
    // WHY: flat, primitive-valued VOs only — ordering stays stable under JSON.stringify.
    return JSON.stringify(this.props) === JSON.stringify(other.props);
  }
}
