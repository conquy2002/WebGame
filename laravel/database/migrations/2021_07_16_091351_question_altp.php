<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class QuestionAltp extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cau_hoiv', function (Blueprint $table) {
            $table->id();
            $table->string('noi_dung');
            $table->integer('linh_vuc_id');
            $table->string('dap_an_a');
            $table->string('dap_an_b');
            $table->string('dap_an_c');
            $table->string('dap_an_d');
            $table->integer('dap_an_dung');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
