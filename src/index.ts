import * as crypto from 'crypto';

interface BlockShape {
  hash: string;
  prevHash: string;
  height: number;
  data: string;
}

class Block implements BlockShape {
  public readonly hash: string;
  constructor(
    public readonly prevHash: string,
    public readonly height: number,
    public readonly data: string
  ) {
    this.hash = Block.calculateHash(prevHash, height, data);
  }
  static calculateHash(prevHash: string, height: number, data: string): string {
    const toHash = `${prevHash}${height}${data}`;
    return crypto.createHash('sha256').update(toHash).digest('hex');
  }
}

class Blockchain {
  private blocks: Block[];
  constructor() {
    this.blocks = [];
  }
  private getPrevHash() {
    if (this.blocks.length === 0) return '';
    return this.blocks[this.blocks.length - 1].hash;
  }

  public addBlock(data: string) {
    const block = new Block(this.getPrevHash(), this.blocks.length + 1, data);
    this.blocks.push(block);
  }

  public getBlocks() {
    // 방어 : private 데이터를 바로 노출하지 않고, spread array로 리턴하면 해킹을 방지할 수 있습니다.
    return [...this.blocks];
  }
}

const blockchain = new Blockchain();
blockchain.addBlock('1st one');
blockchain.addBlock('2nd one');
blockchain.addBlock('3rd one');
// 공격 : 부정한 방법으로 private 데이터 접근권한을 획득하는 경우
blockchain.getBlocks().push(new Block('xxxxx', 1111, 'HACKEDDDDD'));
blockchain.addBlock('4th one');

console.log(blockchain.getBlocks());
