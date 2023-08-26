import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn, OneToMany, JoinColumn } from "typeorm";
import { PostEntity } from "../../posts/entity/posts.entity"; // Import the PostEntity class

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ unique: true, nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column('simple-array',{default:[]})
    likes: string[];

    @Column('simple-array',{default:[]}) 
    dislikes: string[];

    @Column('simple-array',{default:[]}) 
    followers: string[];

    @Column('simple-array',{default:[]})
    follows:string[];

    @BeforeInsert()
    emailToLowerCase() {
        this.email = this.email.toLowerCase();
    }

    @OneToMany(() => PostEntity, post => post.author)
    @JoinColumn({ name: 'posts' })
    posts: PostEntity[];
}
