import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { UserEntity } from "../../users/entity/user.entity"; // Import the UserEntity class

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique:true ,nullable: false })
    title: string;

    @Column({  nullable: false })
    description: string;

     @Column({ nullable: false })
    content: string;

    @Column({ default: 0 })
    likes: number;

    @Column({ default: 0 })
    dislikes: number;

    @ManyToOne(() => UserEntity, user => user.posts) // Many posts belong to one user
    @JoinColumn({ name: 'author' })
    author: UserEntity;
}
