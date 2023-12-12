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
        Schema::create('daftarkelas', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->integer('id_kelas');
            $table->enum('status',['aktif','tidak aktif']);
            $table->enum('sertifikat',['0','1']);
            $table->date('tanggal_terbit');
            $table->string('no_sertifikat');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('daftarkelas');
    }
};
