import { MigrationInterface, QueryRunner } from "typeorm";

export class Test11699655784987 implements MigrationInterface {
    name = 'Test11699655784987'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "currentHashedRefreshToken" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "currentHashedRefreshToken"`);
    }

}
