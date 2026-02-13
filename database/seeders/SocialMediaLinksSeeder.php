<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SocialMediaLink;

class SocialMediaLinksSeeder extends Seeder
{
    public function run(): void
    {
        $links = [
            [
                'platform' => 'Instagram',
                'url' => 'https://instagram.com',
                'icon' => 'Instagram',
                'sort_order' => 1,
            ],
            [
                'platform' => 'Facebook',
                'url' => 'https://facebook.com',
                'icon' => 'Facebook',
                'sort_order' => 2,
            ],
            [
                'platform' => 'Twitter',
                'url' => 'https://twitter.com',
                'icon' => 'Twitter',
                'sort_order' => 3,
            ],
        ];

        foreach ($links as $link) {
            SocialMediaLink::create($link);
        }
    }
}
