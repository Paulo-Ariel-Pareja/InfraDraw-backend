import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PaginateModel } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { SearchDto } from 'src/common/dto/search.dto';
import { transform } from './helper/user.helper';

@Injectable()
export class UserService {
  superAdmin: string;
  superAdminPassword: string;

  private readonly saltOrRounds = 12;
  constructor(
    @InjectModel(User.name)
    private dbUser: PaginateModel<User>,
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.superAdmin = this.configService.getOrThrow<string>(
      'appConfig.userAdmin',
    );
    this.superAdminPassword = this.configService.getOrThrow<string>(
      'appConfig.passAdmin',
    );
  }

  async create(createUserDto: CreateUserDto) {
    try {
      const { username, password } = createUserDto;
      const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);
      const newElement = await this.dbUser.create({
        username,
        password: hashedPassword,
      });
      return transform(newElement);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(searchCriteria: SearchDto) {
    const { search, ...options } = searchCriteria;
    const filters = {
      $or: [{ username: { $regex: search || '', $options: 'i' } }],
    };
    const results = await this.dbUser.paginate(filters, options);
    const { docs, page, limit, totalPages, totalDocs } = results;
    const users: User[] = [];
    if (docs.length != 0) {
      const componentsTransformed = docs.map((item) => {
        return transform(item);
      });
      users.push(...componentsTransformed);
    }
    return {
      users,
      total: totalDocs,
      page,
      limit,
      totalPages,
    };
  }

  async remove(id: string) {
    await this.dbUser.deleteOne({ _id: id });
    return;
  }

  async login(body: CreateUserDto) {
    const errorMessage = 'Username or password incorrect';
    const { username, password } = body;
    if (username === this.superAdmin && password === this.superAdminPassword) {
      const user = {
        id: '123456',
        username: 'SAdmin',
        createdAt: '2025-06-03T00:00:00.000Z',
        updatedAt: '2025-06-03T00:00:00.000Z',
      };
      const { access_token } = this.generateToken(user.id, user.username);
      return {
        access_token,
        ...user,
      };
    } else {
      const exist = await this.dbUser.findOne({ username });
      if (!exist) throw new NotFoundException(errorMessage);
      const isMatch = await bcrypt.compare(password, exist.password);

      if (!isMatch) throw new NotFoundException(errorMessage);
      const { access_token } = this.generateToken(
        exist._id as string,
        username,
      );
      const user = transform(exist);
      return {
        access_token,
        ...user,
      };
    }
  }

  generateToken(userId: string, username: string) {
    const access_token = this.jwtService.sign({
      userId,
      username,
    });
    return { access_token };
  }
}
