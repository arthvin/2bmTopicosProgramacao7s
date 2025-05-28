import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { Repository } from 'typeorm';

describe('TasksService', () => {
  let service: TasksService;
  let repo: Repository<Task>;

  const mockTaskRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasksService,
        {
          provide: getRepositoryToken(Task),
          useValue: mockTaskRepository,
        },
      ],
    }).compile();

    service = module.get<TasksService>(TasksService);
    repo = module.get<Repository<Task>>(getRepositoryToken(Task));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('deve criar uma tarefa', async () => {
    const task = { id: 1, title: 'Teste', description: 'descrição', status: 'PENDENTE' };
    mockTaskRepository.create.mockReturnValue(task);
    mockTaskRepository.save.mockResolvedValue(task);

    const result = await service.createTask('Teste', 'descrição');
    expect(mockTaskRepository.create).toHaveBeenCalledWith({
      title: 'Teste',
      description: 'descrição',
      status: 'PENDENTE',
    });
    expect(mockTaskRepository.save).toHaveBeenCalledWith(task);
    expect(result).toEqual(task);
  });

  it('deve retornar todas as tarefas', async () => {
    const tasks = [{ id: 1, title: 'Tarefa 1', description: 'Descrição 1', status: 'PENDENTE' }];
    mockTaskRepository.find.mockResolvedValue(tasks);

    const result = await service.getAllTasks();
    expect(mockTaskRepository.find).toHaveBeenCalled();
    expect(result).toEqual(tasks);
  });

  it('deve atualizar o status da tarefa', async () => {
    const task = { id: 1, title: 'Tarefa 1', description: 'Descrição 1', status: 'PENDENTE', save: jest.fn() };
    mockTaskRepository.findOneBy.mockResolvedValue(task);
    mockTaskRepository.save.mockResolvedValue({ ...task, status: 'CONCLUÍDO' });

    const result = await service.updateTaskStatus(1, 'CONCLUÍDO');
    expect(mockTaskRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
    expect(task.status).toBe('CONCLUÍDO');
    expect(mockTaskRepository.save).toHaveBeenCalledWith(task);
    expect(result.status).toBe('CONCLUÍDO');
  });

  it('deve lançar erro ao atualizar status de tarefa inexistente', async () => {
    mockTaskRepository.findOneBy.mockResolvedValue(null);
    await expect(service.updateTaskStatus(999, 'CONCLUÍDO')).rejects.toThrow('Tarefa não encontrada');
  });

  it('deve deletar uma tarefa', async () => {
    mockTaskRepository.delete.mockResolvedValue({ affected: 1 });
    await expect(service.deleteTask(1)).resolves.toBeUndefined();
    expect(mockTaskRepository.delete).toHaveBeenCalledWith(1);
  });

  it('deve lançar erro ao tentar deletar tarefa inexistente', async () => {
    mockTaskRepository.delete.mockResolvedValue({ affected: 0 });
    await expect(service.deleteTask(999)).rejects.toThrow('Tarefa não encontrada');
  });
});
