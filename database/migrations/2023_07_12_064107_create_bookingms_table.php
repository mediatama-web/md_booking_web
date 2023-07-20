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
        Schema::create('booking', function (Blueprint $table) {
            $table->id();
            $table->integer('id_user');
            $table->date('tanggal');
            $table->string('jam');
            $table->integer('id_mentor')->nullable();
            $table->integer('id_daftarkelas');
            $table->enum('status',['pending','diterima','ditolak']);
            $table->timestamps();

            $table->foreign('id_user')->references('id')->on('pengguna')->onDelete('cascade');
            $table->foreign('id_mentor')->references('id')->on('mentor')->onDelete('cascade');
            $table->foreign('id_daftarkelas')->references('id')->on('daftarkelas')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('booking');
    }
};
