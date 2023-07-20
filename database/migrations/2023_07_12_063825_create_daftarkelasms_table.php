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
            $table->enum('jenis_pembayaran',['dp','lunas']);
            $table->enum('status',['aktif','tidak aktif']);
            $table->string('jumlah_bayar');
            $table->timestamps();
            
            $table->foreign('id_user')->references('id')->on('pengguna')->onDelete('cascade');
            $table->foreign('id_kelas')->references('id')->on('kelas')->onDelete('cascade');
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
