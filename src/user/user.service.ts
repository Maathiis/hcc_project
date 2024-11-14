import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { UserDto } from './userCreate.dto';

@Injectable()
export class UserService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  findOne(_sub?: number) {
      throw new Error('Method not implemented.');
  }
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: UserDto): Promise<UserEntity> {
    const { nom, prenom, email, password, role } = createUserDto;

    // Cryptage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = this.userRepository.create({
        nom,
        prenom,
        email,
        password: hashedPassword,
        role,
        validateUser: false,
        validateToken: null,
    });

    return await this.userRepository.save(user);
  }

  // Fonction pour valider un utilisateur
  async validateUser(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new Error('User not found');
    }

    // Marque l'utilisateur comme validé
    user.validateUser = true;
    user.validateToken = null;  // Vous pouvez aussi mettre à jour validateToken si nécessaire
    return this.userRepository.save(user);
  }
}
