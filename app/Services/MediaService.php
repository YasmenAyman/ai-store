<?php

namespace App\Services;

use App\Models\Media;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class MediaService
{
    public function upload(UploadedFile $file, string $folder = 'uploads')
    {
        $path = $file->store($folder, 'public');
        
        return Media::create([
            'file_name' => $file->getClientOriginalName(),
            'file_path' => $path,
            'file_type' => $file->getMimeType(),
            'file_size' => $file->getSize(),
        ]);
    }

    public function delete(Media $media)
    {
        Storage::disk('public')->delete($media->file_path);
        return $media->delete();
    }
}
