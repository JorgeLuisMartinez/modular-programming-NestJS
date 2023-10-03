import { MigrationInterface, QueryRunner } from "typeorm";

export class ExtendsBasic1696346699905 implements MigrationInterface {
    name = 'ExtendsBasic1696346699905'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "createAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updateAt" TIMESTAMP NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createAt"`);
        await queryRunner.query(`ALTER TABLE "product" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

}
