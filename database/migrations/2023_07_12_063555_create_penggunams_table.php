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
        Schema::create('pengguna', function (Blueprint $table) {
            $table->id();
            $table->string("nama_pengguna");
            $table->string("no_telpon");
            $table->text("alamat");
            $table->string("email");
            $table->string("password");
            $table->string("foto");
            $table->string("tgl_daftar");
            $table->string("status_akun");
            $table->string("referal");
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pengguna');
    }
};
