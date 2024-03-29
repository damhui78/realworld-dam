package com.lodny.realworlddam.service;

import com.lodny.realworlddam.entity.*;
import com.lodny.realworlddam.entity.dto.*;
import com.lodny.realworlddam.repository.ArticleRepository;
import com.lodny.realworlddam.repository.CommentRepository;
import com.lodny.realworlddam.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleService {

    private final UserService userService;
    private final ProfileService profileService;
    private final ArticleRepository articleRepository;
    private final FavoriteRepository favoriteRepository;
    private final CommentRepository commentRepository;


    public ArticleResponse createArticle(CreateArticleRequest createArticleRequest, RealWorldUser loginUser) {

        ProfileResponse authorProfile = profileService.getProfile(loginUser.getUsername(), loginUser);
        Article article = articleRepository.save(Article.of(createArticleRequest, loginUser.getId()));

        return ArticleResponse.of(article, false, 0L, authorProfile);
    }

    public ArticleResponse updateArticle(UpdateArticleRequest updateArticleRequest,String slug, RealWorldUser loginUser) {

        Article originalArticle = articleRepository.findBySlug(slug);
        if (originalArticle == null) {
            throw new IllegalArgumentException("slug not found");
        }
        if (originalArticle.getAuthorId() != loginUser.getId()) {
            throw new IllegalArgumentException("ID Mismatch");
        }
        ProfileResponse authorProfile = profileService.getProfile(loginUser.getUsername(), loginUser);

        originalArticle.update(updateArticleRequest);

        Article article = articleRepository.save(originalArticle);

        return ArticleResponse.of(article, false, 0L, authorProfile);
    }

    public void deleteArticle(String slug, RealWorldUser loginUser) {
        Article article = articleRepository.findBySlug(slug);
        if (article.getAuthorId() != loginUser.getId()) {
            throw new IllegalArgumentException("ID Mismatch");
        }
        articleRepository.delete(article);
    }

//    public ArticleResponse getArticle__x(String slug, String auth) {
//        ProfileResponse authorProfile;
//        Article article = articleRepository.findBySlug(slug);
//        RealWorldUser author = userService.getUser(article.getAuthorId());
//        long favoritesCount = favoriteRepository.countByFavoriteIdArticleId(article.getId());
//
//        if (StringUtils.isBlank(auth)) {
//            authorProfile = profileService.getProfile(author.getUsername());
//            return ArticleResponse.of(article, false, favoritesCount, authorProfile);
//        }
//
//
//        RealWorldUser loginUser = userService.getRealWorldUserByAuth(auth);
//        authorProfile = profileService.getProfile(author.getUsername(), auth);
//
//        boolean favorited = favoriteRepository.findByFavoriteIdArticleIdAndFavoriteIdUserId(article.getId(), loginUser.getId())
//                    .isPresent();
//
//        return ArticleResponse.of(article, favorited, favoritesCount, authorProfile);
//    }
    public ArticleResponse getArticle(String slug, RealWorldUser loginUser) {
        Long loginUserId = loginUser == null ? -1L : loginUser.getId();
        log.info("getArticle() : loginUserId = {}", loginUserId);

        Object[] queryResult = (Object[])articleRepository.searchBySlug(slug, loginUserId);
        log.info("getArticle() : queryResult = {}", queryResult);
        log.info("getArticle() : queryResult.length = {}", queryResult.length);
        return getArticleResponse(queryResult);
    }

    public ArticlesResponse getArticles(SearchArticleRequest searchArticleRequest, RealWorldUser loginUser) {
        Long loginUserId = loginUser == null ? -1L : loginUser.getId();
        log.info("getArticles() : loginUserId = {}", loginUserId);

        List<ArticleResponse> list = new ArrayList<>();

        int page = searchArticleRequest.offset() / searchArticleRequest.limit();
        log.info("getArticles() : page = {}", page);
        PageRequest pageRequest = PageRequest.of(page, searchArticleRequest.limit());

        Page<Object[]> articles = switch (searchArticleRequest.type()) {
            case "tag" -> articleRepository.searchByTag(searchArticleRequest.tag(), loginUserId, pageRequest);
            case "author" -> articleRepository.searchByAuthor(searchArticleRequest.author(), loginUserId, pageRequest);
            case "favorited" -> articleRepository.searchByFavorited(searchArticleRequest.favorited(), loginUserId, pageRequest);
            default -> articleRepository.getArticles(loginUserId, pageRequest);
        };
        log.info("getArticles() : articles = {}", articles);

        for (Object[] queryResult : articles) {
            log.info("getArticles() : queryResult = {}", queryResult);
            log.info("getArticles() : queryResult.length = {}", queryResult.length);
            list.add(getArticleResponse(queryResult));
        }

        return new ArticlesResponse(list,
                list.size(),
                articles.getTotalPages(),
                articles.getNumber());
    }

    public ArticlesResponse getFeedArticles(SearchArticleRequest searchArticleRequest, RealWorldUser loginUser) {
        log.info("getFeedArticles() : loginUserId = {}", loginUser.getId());

        List<ArticleResponse> list = new ArrayList<>();

        int page = searchArticleRequest.offset() / searchArticleRequest.limit();
        log.info("getFeedArticles() : page = {}", page);
        PageRequest pageRequest = PageRequest.of(page, searchArticleRequest.limit());

        Page<Object[]> articles = articleRepository.getFeed(loginUser.getId(), pageRequest);
        log.info("getFeedArticles() : articles = {}", articles);

        for (Object[] queryResult : articles) {
            log.info("getArticle() : queryResult = {}", queryResult);
            log.info("getArticle() : queryResult.length = {}", queryResult.length);
            list.add(getArticleResponse(queryResult));
        }

        return new ArticlesResponse(list,
                list.size(),
                articles.getTotalPages(),
                articles.getNumber());
    }

    public ArticleResponse createFavorite(String slug, RealWorldUser loginUser) {

        Object[] searchBySlug = (Object[]) articleRepository.searchBySlug(slug, loginUser.getId());
        Favorite favorite = (Favorite) searchBySlug[3];
        log.info("createFavorite() : favorite = {}", favorite);

        if (favorite != null) return getArticleResponse(searchBySlug);

        Article article = (Article) searchBySlug[0];
        favoriteRepository.save(Favorite.of(article.getId(), loginUser.getId()));

        Object[] queryResult = (Object[]) articleRepository.searchBySlug(slug, loginUser.getId());
        log.info("createFavorite() : queryResult = {}", queryResult);
        log.info("createFavorite() : queryResult.length = {}", queryResult.length);

        return getArticleResponse(queryResult);
    }

    public ArticleResponse deleteFavorite(String slug, RealWorldUser loginUser) {

        Article article = articleRepository.findBySlug(slug);

        favoriteRepository.delete(Favorite.of(article.getId(), loginUser.getId()));

        Object[] queryResult = (Object[]) articleRepository.searchBySlug(slug, loginUser.getId());
        log.info("deleteFavorite() : queryResult = {}", queryResult);
        log.info("deleteFavorite() : queryResult.length = {}", queryResult.length);

        return getArticleResponse(queryResult);
    }

    public CommentResponse addComment(String slug, AddCommentRequest addCommentRequest, RealWorldUser loginUser) {

        Article article = articleRepository.findBySlug(slug);

        Comment comment = commentRepository.save(Comment.of(article.getId(), addCommentRequest, loginUser.getId()));

        return CommentResponse.of(comment, ProfileResponse.of(loginUser, false));
    }

    public List<CommentResponse> getComments(String slug, RealWorldUser loginUser) {
        Long loginUserId = loginUser == null ? -1L : loginUser.getId();
        log.info("getComments() : loginUserId = {}", loginUserId);

        List<Object[]> queryResults = commentRepository.commentsBySlug(slug, loginUserId);
        log.info("getComments() : queryResults = {}", queryResults);

        return queryResults.stream().map(this::getCommentResponse).toList();
    }

    public void deleteComment(String slug, Long id, RealWorldUser loginUser) {

        if (loginUser == null) {
            throw new IllegalArgumentException("login user not found");
        }
        Article article = articleRepository.findBySlug(slug);
        if (article == null) {
            throw new IllegalArgumentException("article not found");
        }
        Comment comment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("comment not found"));

        if (!article.getId().equals(comment.getArticleId())) {
            throw new IllegalArgumentException("article id mismatch");
        }
        if (!loginUser.getId().equals(comment.getAuthorId())) {
            throw new IllegalArgumentException("user id mismatch");
        }

        commentRepository.deleteById(id);
    }



    // -----------------------------------------------------------------------------------------------------------------
    private ArticleResponse getArticleResponse(final Object[] queryResult) {
        if (queryResult.length < 5) {
            throw new IllegalArgumentException("check query");
        }

        Following following = (Following) queryResult[2];
        Favorite favorite = (Favorite) queryResult[3];

        return ArticleResponse.of(
                (Article)queryResult[0],
                favorite != null,
                (Long)queryResult[4],
                ProfileResponse.of((RealWorldUser) queryResult[1], following != null));
    }

    private CommentResponse getCommentResponse(final Object[] queryResult) {
        if (queryResult.length < 3) {
            throw new IllegalArgumentException("check query");
        }

        Following following = (Following) queryResult[2];

        return CommentResponse.of(
                (Comment) queryResult[0],
                ProfileResponse.of((RealWorldUser) queryResult[1], following != null));
    }

}