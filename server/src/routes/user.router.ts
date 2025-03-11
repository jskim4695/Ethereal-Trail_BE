import express from 'express';
import { prisma } from '../utils/prisma/index';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { UserService } from './../services/user.service';

const router = express.Router();

// 의존성 생성 및 주입
const userRepository = new UserRepository(prisma);
const userService = new UserService(userRepository);
const userController = new UserController(userService);

// 라우트 설정
router.get('/', userController.getAllUsers.bind(userController));
router.get('/:id', userController.getUserById.bind(userController));
router.post('/register', userController.createUser.bind(userController));
router.patch('/:id', userController.updateUser.bind(userController));
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;
