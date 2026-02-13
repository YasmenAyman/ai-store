<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\BlogPost;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class BlogPostController extends Controller
{
    public function index()
    {
        $posts = BlogPost::with('author')->latest()->get();
        return Inertia::render('Admin/BlogPosts/Index', [
            'posts' => $posts
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/BlogPosts/Form');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'excerpt' => 'nullable|string',
            'excerpt_ar' => 'nullable|string',
            'content' => 'required|string',
            'content_ar' => 'nullable|string',
            'is_published' => 'boolean',
            'image' => 'nullable|image|max:10240', // 10MB
        ]);

        $post = new BlogPost($validated);
        $post->author_id = auth()->id();
        $post->slug = Str::slug($request->title);
        
        // Handle image upload
        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $post->featured_image = '/storage/' . $path;
        }

        if ($request->is_published) {
            $post->published_at = now();
        }

        $post->save();

        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Post created successfully.');
    }

    public function edit(BlogPost $blogPost)
    {
        return Inertia::render('Admin/BlogPosts/Form', [
            'post' => $blogPost
        ]);
    }

    public function update(Request $request, BlogPost $blogPost)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'excerpt' => 'nullable|string',
            'excerpt_ar' => 'nullable|string',
            'content' => 'required|string',
            'content_ar' => 'nullable|string',
            'is_published' => 'boolean',
            'image' => 'nullable|image|max:10240',
        ]);

        $blogPost->fill($validated);
        $blogPost->slug = Str::slug($request->title);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('blogs', 'public');
            $blogPost->featured_image = '/storage/' . $path;
        }

        if ($request->is_published && !$blogPost->published_at) {
            $blogPost->published_at = now();
        } elseif (!$request->is_published) {
            $blogPost->published_at = null;
        }

        $blogPost->save();

        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Post updated successfully.');
    }

    public function destroy(BlogPost $blogPost)
    {
        $blogPost->delete();
        return redirect()->route('admin.blog-posts.index')
            ->with('success', 'Post deleted successfully.');
    }
}
