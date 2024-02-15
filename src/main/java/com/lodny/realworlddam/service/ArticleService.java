package com.lodny.realworlddam.service;

import com.lodny.realworlddam.entity.Article;
import com.lodny.realworlddam.entity.RealWorldUser;
import com.lodny.realworlddam.entity.dto.UpdateArticleRequest;
import com.lodny.realworlddam.entity.dto.CreateArticleRequest;
import com.lodny.realworlddam.entity.dto.ArticleResponse;
import com.lodny.realworlddam.entity.dto.ProfileResponse;
import com.lodny.realworlddam.repository.ArticleRepository;
import com.lodny.realworlddam.repository.FavoriteRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class ArticleService {

    private final UserService userService;
    private final ProfileService profileService;
    private final ArticleRepository articleRepository;
    private final FavoriteRepository favoriteRepository;


    public ArticleResponse createArticle(CreateArticleRequest createArticleRequest, String auth) {

        RealWorldUser loginUser = userService.getRealWorldUserByAuth(auth);
        ProfileResponse authorProfile = profileService.getProfile(loginUser.getUsername(), auth);
        Article article = articleRepository.save(Article.of(createArticleRequest, loginUser.getId()));

        return ArticleResponse.of(article, false, 0L, authorProfile);
    }

    public ArticleResponse updateArticle(UpdateArticleRequest updateArticleRequest,String slug, String auth) {

        RealWorldUser loginUser = userService.getRealWorldUserByAuth(auth);
        Article originalArticle = articleRepository.findBySlug(slug);
        if (originalArticle.getAuthorId() != loginUser.getId()) {
            throw new IllegalArgumentException("ID Mismatch");
        }
        ProfileResponse authorProfile = profileService.getProfile(loginUser.getUsername(), auth);

        originalArticle.update(updateArticleRequest);

        Article article = articleRepository.save(originalArticle);

        return ArticleResponse.of(article, false, 0L, authorProfile);
    }

    public void deleteArticle(String slug, String auth) {
        RealWorldUser loginUser = userService.getRealWorldUserByAuth(auth);
        Article article = articleRepository.findBySlug(slug);
        if (article.getAuthorId() != loginUser.getId()) {
            throw new IllegalArgumentException("ID Mismatch");
        }
        articleRepository.delete(article);
    }

    public ArticleResponse getArticle(String slug, String auth) {
        ProfileResponse authorProfile;
        Article article = articleRepository.findBySlug(slug);
        RealWorldUser author = userService.getUser(article.getAuthorId());
        long favoritesCount = favoriteRepository.countByFavoriteIdArticleId(article.getId());

        if (StringUtils.isBlank(auth)) {
            authorProfile = profileService.getProfile(author.getUsername());
            return ArticleResponse.of(article, false, favoritesCount, authorProfile);
        }


        RealWorldUser loginUser = userService.getRealWorldUserByAuth(auth);
        authorProfile = profileService.getProfile(author.getUsername(), auth);

        boolean favorited = favoriteRepository.findByFavoriteIdArticleIdAndFavoriteIdUserId(article.getId(), loginUser.getId())
                    .isPresent();

        return ArticleResponse.of(article, favorited, favoritesCount, authorProfile);
    }

}
