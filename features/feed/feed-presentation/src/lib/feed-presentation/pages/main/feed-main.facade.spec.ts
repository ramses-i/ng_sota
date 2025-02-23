import { TestBed } from '@angular/core/testing';
import { FeedMainFacade } from './feed-main.facade';
import { CreatePostUseCase, DPosts, GetPostsUseCase } from '@ng-sota/posts-api';
import { left, right } from 'fp-ts/Either';

describe('FeedMainFacade', () => {
  let facade: FeedMainFacade;
  let getPostsMock: jest.Mocked<GetPostsUseCase>;
  let createPostMock: jest.Mocked<CreatePostUseCase>;

  const mockDPosts: DPosts = {
    items: [
      {
        id: '1',
        userId: '123',
        content: 'Post de prueba',
        createdAt: '2024-02-23T10:00:00Z',
      },
    ],
  };

  beforeEach(() => {
    getPostsMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<GetPostsUseCase>;
    createPostMock = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<CreatePostUseCase>;

    TestBed.configureTestingModule({
      providers: [
        FeedMainFacade,
        { provide: GetPostsUseCase, useValue: getPostsMock },
        { provide: CreatePostUseCase, useValue: createPostMock },
      ],
    });

    facade = TestBed.inject(FeedMainFacade);
  });

  describe('getFeed', () => {
    it('debería cargar posts correctamente', async () => {
      getPostsMock.execute.mockResolvedValue(right(mockDPosts));

      await facade.getFeed();

      expect(facade.isLoading()).toBe(false);
      expect(facade.errorMessage()).toBeNull();
      expect(facade.posts().items.length).toBe(1);
      expect(facade.posts().items[0].content).toBe('Post de prueba');
    });

    it('debería manejar errores al obtener posts', async () => {
      getPostsMock.execute.mockResolvedValue(
        left(new Error('Error al cargar posts'))
      );

      await facade.getFeed();

      expect(facade.isLoading()).toBe(false);
      expect(facade.errorMessage()).toBe('Error al cargar posts');
      expect(facade.posts().items.length).toBe(0);
    });
  });

  describe('publishPost', () => {
    it('debería publicar un post y recargar el feed', async () => {
      createPostMock.execute.mockResolvedValue(right(true));
      getPostsMock.execute.mockResolvedValue(right(mockDPosts));

      await facade.publishPost('Nuevo post');

      expect(createPostMock.execute).toHaveBeenCalledWith('Nuevo post');
      expect(getPostsMock.execute).toHaveBeenCalled();
      expect(facade.posts().items.length).toBe(1);
    });

    it('debería manejar error al publicar un post', async () => {
      createPostMock.execute.mockResolvedValue(
        left(new Error('Error al publicar post'))
      );

      await facade.publishPost('Nuevo post');

      expect(facade.errorMessage()).toBe('Error al publicar post');
    });

    it('debería mostrar mensaje si no se puede crear el post', async () => {
      createPostMock.execute.mockResolvedValue(right(false));

      await facade.publishPost('Nuevo post');

      expect(facade.errorMessage()).toBe(
        'Could not create post, please try again later.'
      );
    });
  });
});
