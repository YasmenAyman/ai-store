<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->string('name_ar')->after('name')->nullable();
            $table->longText('description_ar')->after('description')->nullable();
            $table->decimal('rating', 3, 2)->after('stock')->default(0);
            $table->integer('review_count')->after('rating')->default(0);
            $table->boolean('is_best_seller')->after('is_featured')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('products', function (Blueprint $table) {
            $table->dropColumn(['name_ar', 'description_ar', 'rating', 'review_count', 'is_best_seller']);
        });
    }
};
